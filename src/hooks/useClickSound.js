import { useEffect } from "react";
import { attachGlobalClickSound } from "../lib/clickSound";

export function useClickSound() {
  useEffect(() => attachGlobalClickSound(), []);
}
