/**
 * v0 by Vercel.
 * @see https://v0.dev/t/SlSkpXIW0hO
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { DialogTrigger, DialogContent, Dialog } from "@/components/ui/dialog"
import { ExpandIcon } from "@/components/ui/icons"

export function ImgDialog(props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative group overflow-hidden  cursor-pointer">
          <img
            {...props}
            className="w-full h-auto object-cover  group-hover:opacity-80 transition-opacity"
            height="400"
            src={props.src}
            style={{
              aspectRatio: "600/400",
              objectFit: "cover",
            }}
            width="600"
          />
          <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ExpandIcon className="w-10 h-10 text-white" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-none w-full h-full flex items-center justify-center p-0">
        <img
          alt="Image"
          className="max-h-[90vh] max-w-[90vw] object-contain"
          height="800"
          src={props.src}
          style={{
            objectFit: "contain",
          }}
          width="1200"
        />
      </DialogContent>
    </Dialog>
  )
}
