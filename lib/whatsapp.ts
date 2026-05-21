const WHATSAPP_NUMBER = '919366946633'

export function getWhatsAppLink(productName?: string): string {
  const message = productName
    ? `Hi! I'm interested in ordering *${productName}* from MAD BALLERS — BALLER ZONE. Please share more details!`
    : `Hi! I'm interested in ordering from MAD BALLERS — BALLER ZONE. Please help me out!`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
