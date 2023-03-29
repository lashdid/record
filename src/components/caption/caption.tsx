import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./caption.css?inline";

interface CaptionProps {
  type: "small" | "h2";
}

export default component$((props: CaptionProps) => {
  useStylesScoped$(styles);

  return <>
    {props.type === "small" ? (
      <small>
        <Slot />
      </small>
    ) : (
      <h2>
        <Slot />
      </h2>
    )}
  </>
});
