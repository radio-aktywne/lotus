# Use generic base image with Nix installed
FROM nixos/nix:2.26.2 AS base-env

# Configure Nix
RUN echo "extra-experimental-features = nix-command flakes" >> /etc/nix/nix.conf

# Set working directory to something other than root
WORKDIR /env/

# Copy Nix files
COPY flake.lock *.nix ./

# Copy env script
COPY scripts/env.sh scripts/env.sh

FROM base-env AS build-env

# Build build shell closure and activation script
RUN \
    # Mount cached store paths
    --mount=type=cache,target=/nix-store-cache/ \
    # Mount Nix evaluation cache
    --mount=type=cache,target=/root/.cache/nix/ \
    ./scripts/env.sh build build/ /nix-store-cache/

FROM base-env AS runtime-env

# Build runtime shell closure and activation script
RUN \
    # Mount cached store paths
    --mount=type=cache,target=/nix-store-cache/ \
    # Mount Nix evaluation cache
    --mount=type=cache,target=/root/.cache/nix/ \
    ./scripts/env.sh runtime build/ /nix-store-cache/

# Use ubuntu for building
FROM ubuntu:24.04 AS build

# Use bash as default shell
SHELL ["/bin/bash", "-c"]

# Copy build shell closure and activation script
COPY --from=build-env /env/build/closure/ /nix/store/
COPY --from=build-env /env/build/activate /env/activate

# Set working directory to something other than root
WORKDIR /build/

# Setup entrypoint for RUN commands
COPY scripts/shell.sh scripts/shell.sh
SHELL ["/build/scripts/shell.sh"]

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
# hadolint ignore=SC2239
RUN npm ci

# Copy everything else
COPY ./ ./

# Build and keep only runtime dependencies
# hadolint ignore=SC2239
RUN npm run build && npm prune --production

# Ubuntu is probably the safest choice for a runtime container right now
FROM ubuntu:24.04 AS runtime

# Use bash as default shell
SHELL ["/bin/bash", "-c"]

# Copy runtime shell closure and activation script
COPY --from=runtime-env /env/build/closure/ /nix/store/
COPY --from=runtime-env /env/build/activate /env/activate

# Set working directory to something other than root
WORKDIR /app/

# Create app user
RUN useradd --create-home app

# Setup entrypoint for RUN commands
COPY scripts/shell.sh scripts/shell.sh
SHELL ["/app/scripts/shell.sh"]

# Copy app files from build
COPY --from=build /build/build/ build/
# Copy dependencies from build
COPY --from=build /build/node_modules/ node_modules/
# Copy public files
COPY --from=build /build/public/ public/
# Copy package files
COPY --from=build /build/package.json /build/package-lock.json ./
# Copy Next.js config
COPY --from=build /build/next.config.mjs ./

# Setup main entrypoint
COPY scripts/entrypoint.sh scripts/entrypoint.sh
ENTRYPOINT ["/app/scripts/entrypoint.sh", "npm", "run", "--", "run"]
CMD []

# Setup ownership
RUN chown --recursive app: ./
