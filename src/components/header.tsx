import { ToggleTheme } from "./theme/toggle-button";

export const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="font-bold">Buscador CEP</h1>
      <ToggleTheme />
    </div>
  );
};
