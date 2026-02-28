import { msg } from "@lingui/core/macro";

import { getLocalization } from "../../../../../../../localization/lib/get-localization";
import { state } from "../../../../../../../state/vars/state";
import { orpcServerRootBase } from "../../../../../bases/root";
import { localeMiddleware } from "../../../../../middleware/locale";

export const validate = orpcServerRootBase.test.validate
  .use(localeMiddleware)
  .handler(async ({ context, errors, input }) => {
    const { localization } = getLocalization({
      locale: context.localeMiddleware.locale,
    });

    const { data: getRandomJokeData } =
      await state.current.apis.icanhazdadjoke.getRandomJoke({
        headers: { Accept: "application/json" },
      });

    if (getRandomJokeData === undefined) throw errors.INTERNAL_SERVER_ERROR();

    return {
      message:
        context.localeMiddleware.locale === "en"
          ? getRandomJokeData.joke
          : localization.localize(
              msg({
                message:
                  "Why did the chicken cross the road? To get to the other side.",
              }),
            ),
      value: input.value,
    };
  });
