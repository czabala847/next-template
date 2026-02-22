export { default } from "next-auth/middleware"

export const config = {
  matcher: [
    "/admin/:path*",
    "/cart/:path*",
    "/category/:path*",
    "/checkout/:path*",
    "/orders/:path*",
    "/products/:path*",
    "/empty/:path*",
  ]
}
