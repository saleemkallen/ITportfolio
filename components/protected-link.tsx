"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

const STORAGE_KEY = "portfolio_access_unlocked"
const MAX_ATTEMPTS = 5

function readPassword(): string {
  return process.env.NEXT_PUBLIC_PORTFOLIO_ACCESS_PASSWORD ?? ""
}

function isSessionUnlocked(): boolean {
  if (typeof window === "undefined") return false
  return sessionStorage.getItem(STORAGE_KEY) === "1"
}

export function ProtectedLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [disabled, setDisabled] = useState(false)

  const openTarget = () => {
    window.open(href, "_blank", "noopener,noreferrer")
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const expected = readPassword()
    if (!expected) {
      setError(false)
      setOpen(true)
      return
    }
    if (isSessionUnlocked()) {
      openTarget()
      return
    }
    setOpen(true)
    setPassword("")
    setError(false)
  }

  const submit = () => {
    const expected = readPassword()
    if (!expected) {
      setError(true)
      return
    }
    if (password.trim() === expected) {
      sessionStorage.setItem(STORAGE_KEY, "1")
      setOpen(false)
      openTarget()
      setAttempts(0)
      setDisabled(false)
      return
    }
    const next = attempts + 1
    setAttempts(next)
    setPassword("")
    setError(true)
    if (next >= MAX_ATTEMPTS) {
      setDisabled(true)
    }
  }

  return (
    <>
      <button type="button" onClick={handleClick} className={className}>
        {children}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base">Access protected content</DialogTitle>
          </DialogHeader>
          {!readPassword() ? (
            <p className="text-sm text-[#3c4043]">
              Set <code className="text-xs">NEXT_PUBLIC_PORTFOLIO_ACCESS_PASSWORD</code> in{" "}
              <code className="text-xs">.env.local</code> to match your previous portfolio password, then reload.
            </p>
          ) : (
            <>
              <p className="text-sm text-[#3c4043]">
                This file is password protected. Enter the password from your application materials, or use the contact
                section to request access.
              </p>
              <Input
                type="password"
                autoComplete="off"
                placeholder="Password"
                value={password}
                disabled={disabled}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") submit()
                }}
                className="text-sm"
              />
              {error && (
                <p className="text-sm text-red-600">
                  {disabled
                    ? "Too many incorrect attempts. Please use the contact section to request access."
                    : "Incorrect password."}
                </p>
              )}
            </>
          )}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            {readPassword() && (
              <Button type="button" onClick={submit} disabled={disabled}>
                Submit
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
