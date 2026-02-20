'use client';

import { useState, useCallback } from 'react';
import { Check, CreditCard, Download, AlertCircle } from 'lucide-react';
import DashboardLayout from '@/components/layouts/DashboardLayout';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  interval: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const plans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Básico',
    price: 9,
    interval: 'mes',
    description: 'Ideal para probar Tienda Maestra',
    features: [
      'Hasta 5 miembros',
      '10 proyectos activos',
      '5GB de almacenamiento',
      'Analíticas básicas',
      'Soporte por correo',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29,
    interval: 'mes',
    description: 'El favorito de los equipos que crecen',
    features: [
      '25 miembros del equipo',
      'Proyectos ilimitados',
      '100GB de almacenamiento',
      'Analíticas avanzadas',
      'Soporte prioritario',
      'Integraciones personalizadas',
      'Acceso a la API',
    ],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Empresarial',
    price: 99,
    interval: 'mes',
    description: 'Para organizaciones con alto volumen',
    features: [
      'Miembros ilimitados',
      'Proyectos ilimitados',
      'Almacenamiento ilimitado',
      'Analíticas a medida',
      'Soporte 24/7',
      'Integraciones personalizadas',
      'Acceso a la API',
      'SLA garantizado',
      'Customer success dedicado',
    ],
  },
];

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: 'paid' | 'pending' | 'failed';
}

const invoices: Invoice[] = [
  { id: 'FAC-001', date: '1 Dic 2024', amount: '$29.00', status: 'paid' },
  { id: 'FAC-002', date: '1 Nov 2024', amount: '$29.00', status: 'paid' },
  { id: 'FAC-003', date: '1 Oct 2024', amount: '$29.00', status: 'paid' },
  { id: 'FAC-004', date: '1 Sep 2024', amount: '$29.00', status: 'paid' },
];

const invoiceStatusLabels: Record<Invoice['status'], string> = {
  paid: 'Pagada',
  pending: 'Pendiente',
  failed: 'Fallida',
};

export default function BillingPage() {
  const [currentPlan] = useState('pro');
  const [isAnnual, setIsAnnual] = useState(false);

  const handleUpgrade = useCallback((planId: string) => {
    console.log('Upgrading to plan:', planId);
    // Implement Stripe checkout
  }, []);

  const handleDownloadInvoice = useCallback((invoiceId: string) => {
    console.log('Downloading invoice:', invoiceId);
  }, []);

  const toggleBilling = useCallback(() => {
    setIsAnnual(prev => !prev);
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Encabezado */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Planes y facturación</h1>
          <p className="text-gray-600 mt-1">
            Administra tu suscripción y la información de cobro
          </p>
        </div>

        {/* Plan actual */}
        <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-100 text-sm uppercase tracking-wide">Plan actual</p>
              <h2 className="text-2xl font-bold mt-1">Plan Pro</h2>
              <p className="text-primary-100 mt-2">
                Próxima factura: 1 de enero de 2025
              </p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold">$29</p>
              <p className="text-primary-100">/mes</p>
            </div>
          </div>
        </div>

        {/* Método de pago */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Método de pago</h3>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-500">Expira 12/2025</p>
              </div>
            </div>
            <button className="text-primary-500 hover:text-primary-600 font-medium text-sm">
              Actualizar
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Planes disponibles</h3>
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={toggleBilling}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  !isAnnual ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Mensual
              </button>
              <button
                onClick={toggleBilling}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isAnnual ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Anual
                <span className="ml-1 text-xs text-green-600">Ahorra 20%</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans?.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-xl border-2 p-6 transition-all ${
                  plan.id === currentPlan
                    ? 'border-primary-500 bg-primary-50/50'
                    : 'border-gray-100 hover:border-gray-200'
                } ${plan.popular ? 'shadow-lg' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                      Más popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h4 className="text-lg font-semibold text-gray-900">{plan.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">
                      ${isAnnual ? Math.round(plan.price * 0.8) : plan.price}
                    </span>
                    <span className="text-gray-500">/{plan.interval}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features?.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={plan.id === currentPlan}
                  className={`w-full py-2 rounded-lg font-medium transition-colors ${
                    plan.id === currentPlan
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'bg-primary-500 text-white hover:bg-primary-600'
                  }`}
                >
                  {plan.id === currentPlan ? 'Plan actual' : 'Actualizar plan'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Invoices */}
        <div className="bg-white rounded-xl border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Historial de facturas</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {invoices?.length > 0 ? (
              invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{invoice.id}</p>
                      <p className="text-sm text-gray-500">{invoice.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium text-gray-900">{invoice.amount}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        invoice.status === 'paid'
                          ? 'bg-green-100 text-green-700'
                          : invoice.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                       {invoiceStatusLabels[invoice.status]}
                    </span>
                    <button
                      onClick={() => handleDownloadInvoice(invoice.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-12 text-center">
                <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">Aún no hay facturas</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

