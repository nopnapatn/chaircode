import Pane from "../components/pane"
import { Icons } from "../components/shared/icnos"

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <Pane />
      </div>
      <div>
        <div className="absolute bottom-0 inset-x-0 text-center py-5">
          <div className="flex justify-center items-center max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm mr-2">
              <span className="bg-clip-text bg-gradient-to-tl text-xl font-bold from-violet-600 to-pink-600 text-transparent">
                ChairCode
              </span>{" "}
              A product by{" "}
              <a href="https://github.com/nopnapatn">
                <span className="font-bold">Nopnapatn</span>{" "}
              </a>
            </p>
            <a
              href="https://github.com/nopnapatn"
              className="h-5 w-5 mr-2"
            >
              <Icons.gitHub />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
