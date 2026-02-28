import type { NextConfig } from "next";

import { RsdoctorWebpackPlugin } from "@rsdoctor/webpack-plugin";

export default {
  // Disable in-memory caching
  cacheMaxMemorySize: 0,

  // Disable on-screen indicator during development
  devIndicators: false,

  // Change default build directory
  distDir: "build",

  experimental: {
    // Optimize import from Mantine packages
    optimizePackageImports: [
      "@mantine/core",
      "@mantine/dates",
      "@mantine/form",
      "@mantine/hooks",
      "@mantine/notifications",
    ],

    // Include SWC plugins
    swcPlugins: [["@lingui/swc-plugin", {}]],
  },

  // Disable metadata streaming
  htmlLimitedBots: /.*/,

  // Don't bundle packages used only on the server side
  serverExternalPackages: ["@orpc/server", "zod-config"],

  webpack: (config, context) => {
    // Add support for loading .po files
    config.module.rules.push({
      test: /\.po$/,
      use: {
        loader: "@lingui/loader",
        options: {
          // Fail on compilation errors in production builds
          failOnCompileError: !context.dev,

          // Fail on missing translations in production builds
          failOnMissing: !context.dev,
        },
      },
    });

    // Add support for handling source maps in dependencies
    config.module.rules.push({
      enforce: "pre",
      test: /\.m?js$/,
      use: {
        loader: "source-map-loader",
        options: {
          // Remove all source maps from dependencies
          // Some tools can't handle them properly
          filterSourceMappingUrl: () => false,
        },
      },
    });

    // Add bundle analysis for production client builds
    if (!context.dev && !context.isServer)
      config.plugins.push(
        new RsdoctorWebpackPlugin({
          // Disable launching the report in a browser
          // Next.js would kill the process anyway
          disableClientServer: true,

          // Enable only bundle analysis
          features: ["bundle"],

          // Ignore linter checks
          linter: {
            level: "Ignore",
          },

          // Generate brief HTML and JSON reports
          output: {
            mode: "brief",
            options: {
              type: ["html", "json"],
            },
            reportDir: `${context.config.distDir}/.rsdoctor`,
          },

          // Explicitly disable banner support
          supports: {
            banner: false,
          },
        }),
      );

    // Add CSS layers ordering (https://github.com/vercel/next.js/issues/64921, https://github.com/vercel/next.js/discussions/68684)
    config.plugins.push(
      new context.webpack.BannerPlugin({
        banner: "@layer mantine, radio-aktywne;\n\n",
        entryOnly: true,
        include: /\.css$/,
        raw: true,
      }),
    );

    return config;
  },
} satisfies NextConfig;
