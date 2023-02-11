import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './record-button.css?inline';

interface RecordButtonProps {
  type?: 'play' | 'stop'
  onClick$: () => void
}

export default component$((props: RecordButtonProps) => {
  useStylesScoped$(styles);

  return (
    <div class='button-container'>
      <button style={{'--radius': props.type === 'stop' ? 0 : '6rem'}} onClick$={props.onClick$}/>
    </div>
  );
});
