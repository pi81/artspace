import * as ReactNamespace from "react";

/** @frontkom/block-react-parser dist expects global React (legacy Babel output). */
const globalScope = globalThis as typeof globalThis & {
  React?: typeof ReactNamespace;
};

if (!globalScope.React) {
  globalScope.React = ReactNamespace;
}
