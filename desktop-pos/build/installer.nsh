; Custom NSIS install hooks for Purple POS.
;
; Goal (Irene, 2026-07-08): a reinstall must silently remove any running or
; zombie copy of the app and then open cleanly — no manual "close the app",
; no leftover files, no "won't reopen".
;
; Why this is needed: the 0.1.x hidden-print-window zombie (with MIN Cafe)
; kept an INVISIBLE process alive after the window was closed. That zombie held
; both the app's file locks AND the single-instance lock. Installing a new
; version on top of it could not overwrite the locked binaries, so the reinstall
; ended up broken and "would not reopen" until a reboot. Force-killing the
; process (parent + children) before we touch any files makes reinstall
; bulletproof, including the one-time transition FROM an old buggy version.
;
; taskkill and nsExec are always available (Windows built-in + core NSIS plugin),
; so this adds no external plugin dependency.

!macro customInit
  ; /F force, /IM by image name, /T also kill child processes (the hidden print
  ; window). Runs in .onInit, before file copy and before the bundled uninstall
  ; of the previous version, so all locked binaries can be replaced.
  ; Harmless (non-zero exit, ignored) when the app is not running.
  nsExec::Exec 'taskkill /F /IM "Purple POS.exe" /T'
  Pop $0
  ; Give Windows a moment to release the file handles after the kill.
  Sleep 1500
!macroend

; We already force-killed the app above, so skip electron-builder's built-in
; interactive "application is running, close it?" prompt. This keeps the
; one-click reinstall fully silent.
!macro customCheckAppRunning
!macroend
