import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './title.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <>
      <div class='title-container'>
        <div class='corner-left'/>
        <div class='title'>
          <h1>R</h1>
          <h1>e</h1>
          <h1>c</h1>
          <div class='circle-lamp'/>
          <h1>r</h1>
          <h1>D</h1>
        </div>
        <div class='corner-right'/>
      </div>
      <h2>Free Online Screen Recorder</h2>
    </>
  );
});
