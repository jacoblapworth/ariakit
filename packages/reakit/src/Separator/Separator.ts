import { unstable_createComponent } from "../utils/createComponent";
import { mergeProps } from "../utils/mergeProps";
import { unstable_useProps } from "../system/useProps";
import { BoxOptions, BoxProps, useBox } from "../Box/Box";
import { Keys } from "../__utils/types";
import { unstable_useOptions } from "../system";

export type SeparatorOptions = BoxOptions & {
  /**
   * Separator's context orientation.
   * The actual separator's oriention will be flipped based on this prop.
   * So a `"vertical"` orientation means that the separator will have a
   * `"horizontal"` orientation.
   */
  orientation?: "horizontal" | "vertical";
};

export type SeparatorProps = BoxProps;

export function useSeparator(
  { orientation = "vertical", ...options }: SeparatorOptions = {},
  htmlProps: SeparatorProps = {}
) {
  let _options: SeparatorOptions = { orientation, ...options };
  _options = unstable_useOptions("useSeparator", _options, htmlProps);

  const flipMap = {
    horizontal: "vertical",
    vertical: "horizontal"
  };

  htmlProps = mergeProps(
    {
      role: "separator",
      "aria-orientation": _options.orientation
        ? flipMap[_options.orientation]
        : undefined
    } as typeof htmlProps,
    htmlProps
  );
  htmlProps = useBox(_options, htmlProps);
  htmlProps = unstable_useProps("useSeparator", _options, htmlProps);
  return htmlProps;
}

const keys: Keys<SeparatorOptions> = [...useBox.__keys, "orientation"];

useSeparator.__keys = keys;

export const Separator = unstable_createComponent({
  as: "hr",
  useHook: useSeparator
});
