import { component$, Slot, useStylesScoped$ } from '@builder.io/qwik';
import styles from './error.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <span><Slot/></span>
  );
});
