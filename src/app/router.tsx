import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { RequireAuth } from "./guards/RequireAuth";
import { RequireTenant } from "./guards/RequireTenant";
import { AuthProvider } from "./providers/AuthProvider";
import { TenantProvider, useTenant } from "./providers/TenantProvider";
import { AppShellPage } from "../features/app/pages/AppShellPage";
import { OnboardingPage } from "../features/app/pages/OnboardingPage";
import { SettingsPage } from "../features/app/pages/SettingsPage";
import { ForgotPasswordPage } from "../features/auth/pages/ForgotPasswordPage";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { MagicLinkPage } from "../features/auth/pages/MagicLinkPage";
import { OtpPage } from "../features/auth/pages/OtpPage";
import { RegisterPage } from "../features/auth/pages/RegisterPage";
import { ResetPasswordPage } from "../features/auth/pages/ResetPasswordPage";
import { SessionsPage } from "../features/auth/pages/SessionsPage";
import { VerifyEmailPage } from "../features/auth/pages/VerifyEmailPage";
import { ProfileEditPage } from "../features/profile/pages/ProfileEditPage";
import { ProfilePage } from "../features/profile/pages/ProfilePage";
import { ProfilePrivacyPage } from "../features/profile/pages/ProfilePrivacyPage";
import { LandingPage } from "../features/public/pages/LandingPage";

function AppEntryRedirect(): React.ReactElement {
  const { hasTenant } = useTenant();
  return <Navigate to={hasTenant ? "/app/profile" : "/app/onboarding"} replace />;
}

function ForbiddenPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-[#260101] text-[#DCDEF2] flex items-center justify-center p-8">
      <div className="max-w-lg bg-[#1d0000] border border-[#8C5A67] rounded-xl p-6">
        <h1 className="text-2xl font-semibold mb-3">Zugriff verweigert</h1>
        <p className="text-sm text-[#DCDEF2]/90 mb-4">
          Du hast nicht die erforderliche Rolle, um diese Seite zu sehen.
        </p>
        <a className="text-[#A67C7C] hover:underline" href="/app">
          Zurueck zur App
        </a>
      </div>
    </div>
  );
}

export function AppRouter(): React.ReactElement {
  return (
    <AuthProvider>
      <TenantProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify" element={<VerifyEmailPage />} />
            <Route path="/forgot" element={<ForgotPasswordPage />} />
            <Route path="/reset" element={<ResetPasswordPage />} />

            <Route path="/magic-link" element={<MagicLinkPage />} />
            <Route path="/otp" element={<OtpPage />} />

            <Route
              path="/app"
              element={
                <RequireAuth>
                  <AppShellPage />
                </RequireAuth>
              }
            >
              <Route index element={<AppEntryRedirect />} />
              <Route path="onboarding" element={<OnboardingPage />} />
              <Route
                path="profile"
                element={
                  <RequireTenant>
                    <ProfilePage />
                  </RequireTenant>
                }
              />
              <Route
                path="profile/edit"
                element={
                  <RequireTenant>
                    <ProfileEditPage />
                  </RequireTenant>
                }
              />
              <Route
                path="profile/privacy"
                element={
                  <RequireTenant>
                    <ProfilePrivacyPage />
                  </RequireTenant>
                }
              />
              <Route path="sessions" element={<SessionsPage />} />
              <Route
                path="settings"
                element={
                  <RequireTenant>
                    <SettingsPage />
                  </RequireTenant>
                }
              />
            </Route>

            <Route path="/verify-email" element={<Navigate to="/verify" replace />} />
            <Route path="/forgot-password" element={<Navigate to="/forgot" replace />} />
            <Route path="/reset-password" element={<Navigate to="/reset" replace />} />
            <Route path="/profile/me" element={<Navigate to="/app/profile" replace />} />
            <Route path="/profile/edit" element={<Navigate to="/app/profile/edit" replace />} />
            <Route path="/profile/privacy" element={<Navigate to="/app/profile/privacy" replace />} />
            <Route path="/sessions" element={<Navigate to="/app/sessions" replace />} />

            <Route path="/forbidden" element={<ForbiddenPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TenantProvider>
    </AuthProvider>
  );
}
