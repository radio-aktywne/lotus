import type { ThemeScriptInput } from "./types";

import { script } from "./utils";

export function ThemeScript({ colorScheme }: ThemeScriptInput) {
  return (
    <script id="theme-script">{`(${script.toString()})(${JSON.stringify(colorScheme)});`}</script>
  );
}
