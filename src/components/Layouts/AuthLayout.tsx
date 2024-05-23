import React, { PropsWithChildren }  from 'react';


const Credits = ({ className }: {className: string}) => (
  <div className={`relative z-20 mt-auto ${className}`}>
    <blockquote className="space-y-2">
      <p className="text-lg">owo-closed-beta</p>
      <p className="text-xs">{process.env.NEXT_PUBLIC_APP_VERSION}</p>
      <footer className="text-sm">
        <a href="https://owo.quebec/legal/privacy-policy" target="_blank" className="hover:text-gray-500">Politique de Confidentialité</a>&nbsp;|&nbsp;
        <a href="https://owo.quebec/legal/tos" target="_blank" className="hover:text-gray-500">Conditions d'Utilisation</a></footer>
    </blockquote>
  </div>


)

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (

    <div className="lg:container relative lg:h-screen flex-col items-center justify-center lg:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative h-full flex-col bg-muted p-10 text-white flex dark:border-r">
        <div className="absolute inset-0 bg-primary">&nbsp;</div>
        <div className="relative z-20 items-center text-7xl font-black text-center lg:text-left">
          owo
        </div>
        <Credits className="hidden lg:block" />
      </div>
      <div className="lg:p-8">
        {children}
        <Credits className="block lg:hidden text-center scale-75 text-gray-600" />
      </div>
    </div>
  )
}
export default AuthLayout;
