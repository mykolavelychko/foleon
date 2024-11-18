import React, { useState } from "react";
import { Box, Button, Input, Stack } from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import { authenticate } from "@/auth/AuthService";
import { Field } from "@/components/ui/field";
import { useAuth } from "@/auth/AuthContext";

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

function LoginDialog({ open, onClose }: LoginDialogProps) {
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setToken } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await authenticate({ login, password });
      setToken(token);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogRoot open={open} placement="center" motionPreset="slide-in-bottom">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Please authenticate</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack gap="4">
            <Field label="Login">
              <Input
                value={login}
                onChange={(event) => setLogin(event.target.value)}
              />
            </Field>
            <Field label="Password">
              <Input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Field>
            {error && <Box color="red.500">{error}</Box>}
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
          </DialogActionTrigger>
          <Button
            disabled={loading || !login || !password}
            onClick={handleLogin}
          >
            Login
          </Button>
        </DialogFooter>
        <DialogCloseTrigger onClick={onClose} />
      </DialogContent>
    </DialogRoot>
  );
}

export default LoginDialog;
