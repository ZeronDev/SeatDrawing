import { Inter, Noto_Sans_KR, Roboto } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '자리 추첨 프로그램',
  description: '개발 : SICC',
}
const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"], 
  weight: ["100", "400", "700", "900"],
});

const roboto = Roboto({
  subsets: ["latin"], // preload에 사용할 subsets입니다.
  weight: ["100", "400", "700"],
  variable: "--roboto", // CSS 변수 방식으로 스타일을 지정할 경우에 사용합니다.
});

const cls = (...classnames: string[]) => {
  return classnames.join(" ");
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="kor">
    <head>
    <link rel="icon" href="icon.ico"></link>
    </head>

      <body className={cls(notoSansKr.className, roboto.variable, "bg-lightbrown")}>
        {children}
        <style>
        </style>
        </body>
        
    </html>
  )
}
