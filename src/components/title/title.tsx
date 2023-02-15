import type { Signal } from "@builder.io/qwik";
import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./title.css?inline";

interface TitleProps {
  state: 'stream' | 'start' | 'stop'
}

export default component$((props: TitleProps) => {
  useStylesScoped$(styles);

  return (
    <div class="title-container" style={{scale: props.state !== 'stream' ? '50%' : '100%'}}>
      <div class="corner-left" />
      <div class="title">
        <h1>R</h1>
        <h1>e</h1>
        <h1>c</h1>
        <div class="circle-lamp" />
        <h1>r</h1>
        <h1>D</h1>
      </div>
      <div class="corner-right" />
    </div>
  );
});
