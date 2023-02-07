import { component$, Slot, useStylesScoped$ } from '@builder.io/qwik';
import styles from './main-button.css?inline';

interface MainButtonProps {
  onClick$: () => void
}

export default component$((props: MainButtonProps) => {
  useStylesScoped$(styles);

  return (
    <div class='button-container'>
      <button {...props}><Slot/></button>
    </div>
  );
});
