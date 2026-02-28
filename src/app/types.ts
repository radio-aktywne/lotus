import type { PropsWithChildren, ReactNode } from "react";
import type { Simplify } from "type-fest";
import type * as z from "zod";

export type PathParameters<KeysType extends string = never> = Simplify<
  {
    [KeyType in KeysType as KeyType extends `...${infer CatchAllKeyType}`
      ? CatchAllKeyType
      : never]: string[];
  } & {
    [KeyType in KeysType as KeyType extends `...${string}` | `[...${string}]`
      ? never
      : KeyType]: string;
  } & {
    [KeyType in KeysType as KeyType extends `[...${infer OptionalCatchAllKeyType}]`
      ? OptionalCatchAllKeyType
      : never]?: string[];
  }
>;

export type QueryParameters<KeysType extends string = never> = {
  [KeyType in KeysType]?: string | string[];
};

export type AnyPathParameters = {
  [key: string]: string | string[] | undefined;
};

export type AnyQueryParameters = {
  [key: string]: string | string[] | undefined;
};

export type ParsedPathParameters<SchemaType extends z.core.$ZodObject> =
  z.core.output<SchemaType>;

export type ParsedQueryParameters<SchemaType extends z.core.$ZodObject> =
  z.core.output<SchemaType>;

export type Slots<KeysType extends string = never> = {
  [Key in KeysType]: ReactNode;
};

export type DefaultInput<PathParametersKeysType extends string = never> = {
  params: Promise<PathParameters<PathParametersKeysType>>;
};

export type ErrorInput = {
  reset: () => void;
};

export type LayoutInput<
  PathParametersKeysType extends string = never,
  SlotsKeysType extends string = never,
> = Simplify<
  PropsWithChildren<
    Slots<SlotsKeysType> & {
      params: Promise<PathParameters<PathParametersKeysType>>;
    }
  >
>;

export type LoadingInput = object;

export type NotFoundInput = object;

export type PageInput<
  PathParametersKeysType extends string = never,
  QueryParametersKeysType extends string = never,
> = {
  params: Promise<PathParameters<PathParametersKeysType>>;
  searchParams: Promise<QueryParameters<QueryParametersKeysType>>;
};

export type TemplateInput = Simplify<PropsWithChildren<object>>;

export type RouteInput<PathParametersKeysType extends string = never> = {
  params: Promise<PathParameters<PathParametersKeysType>>;
};

export type ErrorMetadataUtilityInput = object;

export type LayoutMetadataInput<PathParametersKeysType extends string = never> =
  {
    params: Promise<PathParameters<PathParametersKeysType>>;
  };

export type LayoutMetadataUtilityInput<
  PathParametersSchemaType extends z.core.$ZodObject = never,
> = [PathParametersSchemaType] extends [never]
  ? object
  : {
      pathParameters: ParsedPathParameters<PathParametersSchemaType>;
    };

export type NotFoundMetadataInput = object;

export type NotFoundMetadataUtilityInput = object;

export type PageMetadataInput<
  PathParametersKeysType extends string = never,
  QueryParametersKeysType extends string = never,
> = {
  params: Promise<PathParameters<PathParametersKeysType>>;
  searchParams: Promise<QueryParameters<QueryParametersKeysType>>;
};

export type PageMetadataUtilityInput<
  PathParametersSchemaType extends z.core.$ZodObject = never,
  QueryParametersSchemaType extends z.core.$ZodObject = never,
> = Simplify<
  ([PathParametersSchemaType] extends [never]
    ? object
    : {
        pathParameters: ParsedPathParameters<PathParametersSchemaType>;
      }) &
    ([QueryParametersSchemaType] extends [never]
      ? object
      : {
          queryParameters: ParsedQueryParameters<QueryParametersSchemaType>;
        })
>;

export type ErrorViewportUtilityInput = object;

export type LayoutViewportInput<PathParametersKeysType extends string = never> =
  {
    params: Promise<PathParameters<PathParametersKeysType>>;
  };

export type LayoutViewportUtilityInput<
  PathParametersSchemaType extends z.core.$ZodObject = never,
> = [PathParametersSchemaType] extends [never]
  ? object
  : {
      pathParameters: ParsedPathParameters<PathParametersSchemaType>;
    };

export type NotFoundViewportInput = object;

export type NotFoundViewportUtilityInput = object;

export type PageViewportInput<
  PathParametersKeysType extends string = never,
  QueryParametersKeysType extends string = never,
> = {
  params: Promise<PathParameters<PathParametersKeysType>>;
  searchParams: Promise<QueryParameters<QueryParametersKeysType>>;
};

export type PageViewportUtilityInput<
  PathParametersSchemaType extends z.core.$ZodObject = never,
  QueryParametersSchemaType extends z.core.$ZodObject = never,
> = Simplify<
  ([PathParametersSchemaType] extends [never]
    ? object
    : {
        pathParameters: ParsedPathParameters<PathParametersSchemaType>;
      }) &
    ([QueryParametersSchemaType] extends [never]
      ? object
      : {
          queryParameters: ParsedQueryParameters<QueryParametersSchemaType>;
        })
>;

export type DefaultViewInput<
  PathParametersSchemaType extends z.core.$ZodObject = never,
> = [PathParametersSchemaType] extends [never]
  ? object
  : { pathParameters: ParsedPathParameters<PathParametersSchemaType> };

export type ErrorViewInput = {
  reset: () => void;
};

export type LayoutViewInput<
  PathParametersSchemaType extends z.core.$ZodObject = never,
  SlotsKeysType extends string = never,
> = Simplify<
  PropsWithChildren<
    ([PathParametersSchemaType] extends [never]
      ? object
      : {
          pathParameters: ParsedPathParameters<PathParametersSchemaType>;
        }) &
      Slots<SlotsKeysType>
  >
>;

export type LoadingViewInput = object;

export type NotFoundViewInput = object;

export type PageViewInput<
  PathParametersSchemaType extends z.core.$ZodObject = never,
  QueryParametersSchemaType extends z.core.$ZodObject = never,
> = Simplify<
  ([PathParametersSchemaType] extends [never]
    ? object
    : {
        pathParameters: ParsedPathParameters<PathParametersSchemaType>;
      }) &
    ([QueryParametersSchemaType] extends [never]
      ? object
      : {
          queryParameters: ParsedQueryParameters<QueryParametersSchemaType>;
        })
>;

export type TemplateViewInput = Simplify<PropsWithChildren<object>>;
