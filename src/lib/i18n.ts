import type { Lang } from './types'

const t = {
  fr: {
    loading: 'Chargement…',
    table: 'Table',
    currency: 'MAD',
    menu: { title: 'Menu', popular: 'Populaire', chefChoice: 'Choix du chef', unavailable: 'Indisponible', noItems: 'Aucun article' },
    cart: { title: 'Panier', empty: 'Votre panier est vide', subtotal: 'Sous-total', checkout: 'Commander', itemAdded: 'Ajouté au panier' },
    order: { place: 'Passer la commande', success: 'Commande envoyée !', successBody: 'Votre commande est en préparation.', myOrders: 'Mes commandes', noOrders: 'Aucune commande pour cette table.', back: 'Retour au menu', trackOrder: 'Suivre ma commande' },
    status: { pending: 'En attente', confirmed: 'Confirmée', preparing: 'En préparation', ready: '🔔 Prête !', served: 'Servie', paid: 'Payée', cancelled: 'Annulée' },
    requests: { title: 'Service rapide', water: 'Eau', bread: 'Pain', napkins: 'Serviettes', bill: 'Addition', kids_chair: 'Chaise enfant', condiments: 'Condiments', sent: 'Demande envoyée !' },
    geo: {
      title: 'Localisation requise',
      body: 'Pour commander, votre GPS doit confirmer que vous êtes bien dans le restaurant.',
      enable: 'Activer la localisation',
      outside: 'Vous semblez être hors du restaurant.',
      outsideBody: 'Vérifiez que vous êtes bien sur place et réessayez.',
      retry: 'Réessayer',
      pinHint: 'Vous avez un code PIN ?',
      pinBody: 'Demandez le code PIN à votre serveur.',
      pinLabel: 'Code PIN',
      pinPlaceholder: '0000',
      pinSubmit: 'Valider',
      pinError: 'Code incorrect. Réessayez.',
      pinSuccess: 'Accès autorisé',
    },
    error: { notFound: 'Restaurant introuvable.', inactive: 'Ce restaurant est momentanément fermé.', tableNotFound: 'Table introuvable.', retry: 'Réessayer' },
    notes: 'Remarques (sans oignons, allergie…)',
    add: 'Ajouter',
    remove: 'Retirer',
    close: 'Fermer',
    viewCart: 'Voir le panier',
  },
  ar: {
    loading: 'جار التحميل…',
    table: 'طاولة',
    currency: 'درهم',
    menu: { title: 'القائمة', popular: 'شائع', chefChoice: 'اختيار الشيف', unavailable: 'غير متوفر', noItems: 'لا توجد عناصر' },
    cart: { title: 'السلة', empty: 'سلتك فارغة', subtotal: 'المجموع', checkout: 'تأكيد الطلب', itemAdded: 'أُضيف للسلة' },
    order: { place: 'إرسال الطلب', success: 'تم إرسال الطلب!', successBody: 'طلبك قيد التحضير.', myOrders: 'طلباتي', noOrders: 'لا توجد طلبات لهذه الطاولة.', back: 'العودة للقائمة', trackOrder: 'تتبع طلبي' },
    status: { pending: 'في الانتظار', confirmed: 'مؤكد', preparing: 'جارٍ التحضير', ready: '🔔 جاهز!', served: 'تم التقديم', paid: 'مدفوع', cancelled: 'ملغى' },
    requests: { title: 'خدمة سريعة', water: 'ماء', bread: 'خبز', napkins: 'مناديل', bill: 'الحساب', kids_chair: 'كرسي أطفال', condiments: 'توابل', sent: 'تم إرسال الطلب!' },
    geo: {
      title: 'الموقع مطلوب',
      body: 'لتقديم طلبك، يجب أن يؤكد GPS وجودك داخل المطعم.',
      enable: 'تفعيل الموقع',
      outside: 'يبدو أنك خارج المطعم.',
      outsideBody: 'تأكد من وجودك على الموقع وحاول مجدداً.',
      retry: 'إعادة المحاولة',
      pinHint: 'لديك رمز PIN؟',
      pinBody: 'اطلب رمز PIN من النادل.',
      pinLabel: 'رمز PIN',
      pinPlaceholder: '0000',
      pinSubmit: 'تحقق',
      pinError: 'رمز غير صحيح. حاول مجدداً.',
      pinSuccess: 'تم الوصول',
    },
    error: { notFound: 'المطعم غير موجود.', inactive: 'هذا المطعم مغلق مؤقتاً.', tableNotFound: 'الطاولة غير موجودة.', retry: 'إعادة المحاولة' },
    notes: 'ملاحظات (بدون بصل، حساسية…)',
    add: 'إضافة',
    remove: 'إزالة',
    close: 'إغلاق',
    viewCart: 'عرض السلة',
  },
  en: {
    loading: 'Loading…',
    table: 'Table',
    currency: 'MAD',
    menu: { title: 'Menu', popular: 'Popular', chefChoice: "Chef's Choice", unavailable: 'Unavailable', noItems: 'No items' },
    cart: { title: 'Cart', empty: 'Your cart is empty', subtotal: 'Subtotal', checkout: 'Place Order', itemAdded: 'Added to cart' },
    order: { place: 'Place Order', success: 'Order sent!', successBody: 'Your order is being prepared.', myOrders: 'My Orders', noOrders: 'No orders for this table.', back: 'Back to menu', trackOrder: 'Track my order' },
    status: { pending: 'Pending', confirmed: 'Confirmed', preparing: 'Preparing', ready: '🔔 Ready!', served: 'Served', paid: 'Paid', cancelled: 'Cancelled' },
    requests: { title: 'Quick Service', water: 'Water', bread: 'Bread', napkins: 'Napkins', bill: 'Bill', kids_chair: "Kid's Chair", condiments: 'Condiments', sent: 'Request sent!' },
    geo: {
      title: 'Location Required',
      body: 'To order, your GPS must confirm you are inside the restaurant.',
      enable: 'Enable Location',
      outside: 'You appear to be outside the restaurant.',
      outsideBody: 'Make sure you are on-site and try again.',
      retry: 'Try Again',
      pinHint: 'Have a PIN?',
      pinBody: 'Ask your server for the PIN code.',
      pinLabel: 'PIN Code',
      pinPlaceholder: '0000',
      pinSubmit: 'Verify',
      pinError: 'Incorrect PIN. Please try again.',
      pinSuccess: 'Access granted',
    },
    error: { notFound: 'Restaurant not found.', inactive: 'This restaurant is temporarily closed.', tableNotFound: 'Table not found.', retry: 'Try Again' },
    notes: 'Notes (no onions, allergy…)',
    add: 'Add',
    remove: 'Remove',
    close: 'Close',
    viewCart: 'View cart',
  },
} as const

export type Translations = {
  loading: string
  table: string
  currency: string
  menu: { title: string; popular: string; chefChoice: string; unavailable: string; noItems: string }
  cart: { title: string; empty: string; subtotal: string; checkout: string; itemAdded: string }
  order: { place: string; success: string; successBody: string; myOrders: string; noOrders: string; back: string; trackOrder: string }
  status: { pending: string; confirmed: string; preparing: string; ready: string; served: string; paid: string; cancelled: string }
  requests: { title: string; water: string; bread: string; napkins: string; bill: string; kids_chair: string; condiments: string; sent: string }
  geo: { title: string; body: string; enable: string; outside: string; outsideBody: string; retry: string; pinHint: string; pinBody: string; pinLabel: string; pinPlaceholder: string; pinSubmit: string; pinError: string; pinSuccess: string }
  error: { notFound: string; inactive: string; tableNotFound: string; retry: string }
  notes: string
  add: string
  remove: string
  close: string
  viewCart: string
}
export { t }

export function getTranslations(lang: Lang): Translations {
  return t[lang] as Translations
}
