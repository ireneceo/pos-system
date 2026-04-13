import 'react-i18next';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: Record<string, string>;
      auth: Record<string, string>;
      dashboard: Record<string, string>;
      orders: Record<string, string>;
      menu: Record<string, string>;
      inventory: Record<string, string>;
      invoices: Record<string, string>;
      staff: Record<string, string>;
      customers: Record<string, string>;
      pos: Record<string, string>;
      kitchen: Record<string, string>;
      settings: Record<string, string>;
      reports: Record<string, string>;
      brand: Record<string, string>;
      foodcourt: Record<string, string>;
      owner: Record<string, string>;
      admin: Record<string, string>;
      landing: Record<string, string>;
      plans: Record<string, string>;
      notifications: Record<string, string>;
      floorplan: Record<string, string>;
      recipes: Record<string, string>;
      suppliers: Record<string, string>;
      validation: Record<string, string>;
      contract: Record<string, string>;
      support: Record<string, string>;
    };
  }
}
