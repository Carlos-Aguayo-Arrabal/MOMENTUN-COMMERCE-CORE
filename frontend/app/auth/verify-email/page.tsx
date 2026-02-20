'use client';

import { Suspense, useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, XCircle, Loader2, Mail } from 'lucide-react';

type VerificationStatus = 'loading' | 'success' | 'error' | 'no-token';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  
  const [status, setStatus] = useState<VerificationStatus>('loading');
  const [message, setMessage] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [resendEmail, setResendEmail] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('no-token');
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage('Verificamos tu correo exitosamente.');
          
          // Redirect to dashboard after 3 seconds
          setTimeout(() => {
            router.push('/dashboard');
          }, 3000);
        } else {
          setStatus('error');
          setMessage(data.message || 'No pudimos verificar tu correo. Puede que el enlace haya expirado.');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Ocurrió un error al verificar tu correo.');
      }
    };

    verifyEmail();
  }, [token, router]);

  const handleResendVerification = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resendEmail) return;
    
    setIsResending(true);
    
    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resendEmail }),
      });

      if (response.ok) {
        setMessage('Si existe una cuenta sin verificar, enviamos un nuevo correo con el enlace.');
      }
    } catch (error) {
      setMessage('No pudimos reenviar el correo de verificación.');
    } finally {
      setIsResending(false);
    }
  }, [resendEmail]);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setResendEmail(e.target.value);
  }, []);

  return (
    <div className="max-w-md w-full">
      {/* Logo */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500" />
          <span className="font-bold text-2xl text-gray-900">Tienda Maestra</span>
        </Link>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center animate-scale-in">
        {status === 'loading' && (
          <>
            <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
              <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Verificando tu correo...
            </h1>
            <p className="text-gray-600">
              Espera un momento mientras confirmamos tu dirección.
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              ¡Correo verificado!
            </h1>
            <p className="text-gray-600 mb-6">
              {message}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Redirigiendo al panel...
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors"
            >
              Ir al panel
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              No pudimos verificar el correo
            </h1>
            <p className="text-gray-600 mb-6">
              {message}
            </p>
            
            {/* Resend form */}
            <div className="border-t border-gray-100 pt-6 mt-6">
              <p className="text-sm text-gray-600 mb-4">
                ¿Necesitas un nuevo enlace?
              </p>
              <form onSubmit={handleResendVerification} className="space-y-4">
                <input
                  type="email"
                  value={resendEmail}
                  onChange={handleEmailChange}
                  placeholder="Introduce tu correo"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  disabled={isResending}
                  className="w-full bg-primary-500 text-white py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors disabled:opacity-50"
                >
                  {isResending ? 'Enviando...' : 'Reenviar correo de verificación'}
                </button>
              </form>
            </div>

            <div className="mt-6">
              <Link
                href="/auth/login"
                className="text-primary-500 hover:text-primary-600 font-medium"
              >
                Volver al inicio de sesión
              </Link>
            </div>
          </>
        )}

        {status === 'no-token' && (
          <>
            <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-yellow-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Revisa tu correo
            </h1>
            <p className="text-gray-600 mb-6">
              Te enviamos un enlace de verificación. Revisa tu bandeja y haz clic para confirmar tu correo.
            </p>
            
            {/* Resend form */}
            <div className="border-t border-gray-100 pt-6 mt-6">
              <p className="text-sm text-gray-600 mb-4">
                Didn&apos;t receive the email?
              </p>
              <form onSubmit={handleResendVerification} className="space-y-4">
                <input
                  type="email"
                  value={resendEmail}
                  onChange={handleEmailChange}
                  placeholder="Introduce tu correo"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  disabled={isResending}
                  className="w-full bg-primary-500 text-white py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors disabled:opacity-50"
                >
                  {isResending ? 'Enviando...' : 'Reenviar correo de verificación'}
                </button>
              </form>
            </div>

            <div className="mt-6">
              <Link
                href="/auth/login"
                className="text-primary-500 hover:text-primary-600 font-medium"
              >
                Volver al inicio de sesión
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="max-w-md w-full">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500" />
          <span className="font-bold text-2xl text-gray-900">Tienda Maestra</span>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
          <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Cargando...
        </h1>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 py-12 px-4">
      <Suspense fallback={<LoadingFallback />}>
        <VerifyEmailContent />
      </Suspense>
    </div>
  );
}
