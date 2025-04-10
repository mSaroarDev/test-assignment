import Link from "next/link";
import { Button } from "../subcomponents/Buttons";
import { ToggleTheme } from "../ToggleTheme";

const Navbar = () => {
    return (
        <>
          <div className="shadow-md px-5">
            <main className="flex items-center justify-between py-4">
              <Link href="/">
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                  Test Assignment
                </h1>
              </Link>

              <div className="flex items-center gap-5">
                <ToggleTheme />
                <Button navigate="/apply">Go to Apply</Button>
              </div>
            </main>
          </div>
        </>
    );
};

export default Navbar;