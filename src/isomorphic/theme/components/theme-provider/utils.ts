import type {
  MantineColorScheme,
  MantineColorSchemeManager,
} from "@mantine/core";

export class ForceColorSchemeManager implements MantineColorSchemeManager {
  constructor(protected readonly colorScheme: MantineColorScheme) {}

  clear() {
    return;
  }

  get() {
    return this.colorScheme;
  }

  set() {
    return;
  }

  subscribe() {
    return;
  }

  unsubscribe() {
    return;
  }
}
