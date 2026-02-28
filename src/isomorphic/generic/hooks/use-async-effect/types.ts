export type UseAsyncEffectIsActive = () => boolean;

export type UseAsyncEffectCallback = (
  isActive: UseAsyncEffectIsActive,
) => Promise<void>;

export type UseAsyncEffectDependencies = readonly unknown[];

export type UseAsyncEffectDestructor = (() => void) | undefined;
