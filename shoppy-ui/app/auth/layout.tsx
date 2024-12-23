import { Box } from "@mui/material";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Box className="h-screen flex items-center justify-center">{children}</Box>
  );
}
