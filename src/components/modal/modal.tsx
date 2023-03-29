import { component$,  useSignal, useStylesScoped$ } from "@builder.io/qwik";
import type { PropFunction } from "@builder.io/qwik";
import { defaultName } from "~/utils/functions";
import Error from "../error/error";
import styles from "./modal.css?inline";

interface ModalProps {
  onDownload$: PropFunction<(name: string, type: string) => void>;
  onCancel$: PropFunction<() => void>;
  fileFormats: string[];
}

export default component$((props: ModalProps) => {
  useStylesScoped$(styles);

  const inputRef = useSignal<HTMLInputElement>();
  const selectRef = useSignal<HTMLSelectElement>();

  return (
    <div class="modal-container">
      <div class="modal-content">
        <span>Choose file name / type :</span>
        <div class="modal-form">
          <input
            class="modal-input"
            value={defaultName()}
            ref={inputRef}
            placeholder="File name..."
            maxLength={30}
          />
          <select class="modal-option" ref={selectRef}>
            {props.fileFormats.map((format) => (
              <option value={format}>{format}</option>
            ))}
          </select>
        </div>
        {props.fileFormats.length === 1 && (
          <Error>
            Other type is not supported in this browser. Please consider not
            using Firefox
          </Error>
        )}
        <div class='modal-button-container'>
          <button class="modal-button" onClick$={props.onCancel$}>
            Cancel
          </button>
          <button
            class="modal-button"
            onClick$={async () => await props.onDownload$(inputRef.value!.value, selectRef.value!.value)}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
});
