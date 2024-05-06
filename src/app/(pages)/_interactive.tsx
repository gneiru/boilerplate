"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useActionState } from "react";
import { toast } from "sonner";
import { createPost } from "./_actions";

interface FormProps extends React.ComponentPropsWithoutRef<"form"> {
  actionString: keyof typeof formActions;
  loadingMessage?: string;
}

const formActions = {
  createPost,
} as const;

export function Form({
  children,
  actionString,
  loadingMessage = "Please wait ...",
  ...props
}: FormProps) {
  const [state, formAction, pending] = useActionState(
    formActions[actionString],
    undefined,
  );
  useEffect(() => {
    if (state?.success === true) toast.success(state.message);
    if (state?.success === false) toast.error(state.message);
  }, [state]);

  return (
    <form {...props} action={formAction}>
      {children}
      <Button type="submit" disabled={pending}>
        Submit
      </Button>
    </form>
  );
}
