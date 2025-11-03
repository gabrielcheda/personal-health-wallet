export interface ShareOptions {
  title: string;
  text: string;
  url?: string;
}

export async function shareContent(options: ShareOptions): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  // Check if Web Share API is available
  if (navigator.share) {
    try {
      await navigator.share(options);
      return true;
    } catch (error) {
      // User cancelled or error occurred
      console.error('Share failed:', error);
      return false;
    }
  }

  // Fallback: copy to clipboard
  if (options.url && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(options.url);
      return true;
    } catch (error) {
      console.error('Clipboard copy failed:', error);
      return false;
    }
  }

  return false;
}

export function shareViaWhatsApp(text: string, url?: string): void {
  const message = encodeURIComponent(`${text}${url ? ` ${url}` : ''}`);
  const whatsappUrl = `https://wa.me/?text=${message}`;
  window.open(whatsappUrl, '_blank');
}

export function shareViaEmail(subject: string, body: string, url?: string): void {
  const emailBody = encodeURIComponent(`${body}${url ? `\n\n${url}` : ''}`);
  const emailSubject = encodeURIComponent(subject);
  const mailtoUrl = `mailto:?subject=${emailSubject}&body=${emailBody}`;
  window.location.href = mailtoUrl;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error('Clipboard copy failed:', error);
      return false;
    }
  }

  // Fallback for older browsers
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return true;
  } catch (error) {
    console.error('Fallback copy failed:', error);
    return false;
  }
}
