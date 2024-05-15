import React, { PropsWithChildren }  from 'react';

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (

    <div className="lg:container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-primary">&nbsp;</div>
        <div className="relative z-20 flex items-center text-7xl font-black">
          owo
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">owo-closed-beta v.#commit-number</p>
            <footer className="text-sm">
              <a href="https://owo.quebec/legal/privacy-policy" target="_blank">Politique de Confidentialité</a>&nbsp;|&nbsp;
              <a href="https://owo.quebec/legal/tos" target="_blank">Conditions d'Utilisation</a></footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        {children}
      </div>
    </div>
  )
}
export default AuthLayout;
