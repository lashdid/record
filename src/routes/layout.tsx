import { component$, Slot } from "@builder.io/qwik";
import Header from "../components/title/title";

export default component$(() => {
  return (
    <>
      <main>
        <Slot />
      </main>
    </>
  );
});
