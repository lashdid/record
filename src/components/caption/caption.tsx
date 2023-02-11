import { component$, Slot, useStylesScoped$ } from '@builder.io/qwik';
import styles from './caption.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <h2><Slot/></h2>
  );
});
