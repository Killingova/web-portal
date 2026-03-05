import type { ReactElement } from "react";
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
import { VerifyEmailPage } from "../features/auth/pages/VerifyEmailPage";
import { ProfileEditPage } from "../features/profile/pages/ProfileEditPage";
import { ProfilePage } from "../features/profile/pages/ProfilePage";
import { ProfilePrivacyPage } from "../features/profile/pages/ProfilePrivacyPage";
import { SessionsPage } from "../features/auth/pages/SessionsPage";
import { LandingPage } from "../features/public/pages/LandingPage";
import { PublicLayout } from "../features/public/pages/PublicLayout";
import { ImpressumPage } from "../features/public/pages/ImpressumPage";
import { DatenschutzPage } from "../features/public/pages/DatenschutzPage";
import { KontaktPage } from "../features/public/pages/KontaktPage";
import { UeberPage } from "../features/public/pages/UeberPage";

function AppEntryRedirect(): ReactElement {
  const { hasTenant } = useTenant();
  return <Navigate to={hasTenant ? "/app/profile" : "/app/onboarding"} replace />;
}

function ForbiddenPage(): ReactElement {
  return (
    <div className="min-h-screen bg-[#0d1117] text-[#f2eeff] flex items-center justify-center p-8">
      <div className="max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h1 className="text-xl sm:text-2xl font-semibold mb-3">Zugriff verweigert</h1>
        <p className="text-sm text-[#b9adcf] mb-4">
          Du hast nicht die erforderliche Rolle, um diese Seite zu sehen.
        </p>
        <a className="text-[#9b7fe8] hover:text-[#bba6ff] hover:underline transition-colors" href="/app">
          Zurueck zur App
        </a>
      </div>
    </div>
  );
}

export function AppRouter(): ReactElement {
  return (
    <AuthProvider>
      <TenantProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify" element={<VerifyEmailPage />} />
            <Route path="/forgot" element={<ForgotPasswordPage />} />
            <Route path="/reset" element={<ResetPasswordPage />} />

            <Route path="/magic-link" element={<MagicLinkPage />} />
            <Route path="/otp" element={<OtpPage />} />

            <Route element={<PublicLayout />}>
              <Route path="/ueber"       element={<UeberPage />} />
              <Route path="/kontakt"     element={<KontaktPage />} />
              <Route path="/impressum"   element={<ImpressumPage />} />
              <Route path="/datenschutz" element={<DatenschutzPage />} />
            </Route>

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
              <Route
                path="settings"
                element={
                  <RequireTenant>
                    <SettingsPage />
                  </RequireTenant>
                }
              />
              <Route
                path="sessions"
                element={
                  <RequireTenant>
                    <SessionsPage />
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

            <Route path="/forbidden" element={<ForbiddenPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TenantProvider>
    </AuthProvider>
  );
}
