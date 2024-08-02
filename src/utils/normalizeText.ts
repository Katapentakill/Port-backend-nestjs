import stringSimilarity from 'string-similarity';
import { spanish } from 'stopwords';

// Función para eliminar diacríticos (acentos) de los caracteres
function removeAccents(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Función para normalizar el texto
export function normalizeText(text: string): string {
    console.log('Original text:', text);

    // Convertir el texto a minúsculas
    let normalizedText = text.toLowerCase();
    console.log('Lowercased text:', normalizedText);

    // Eliminar acentos
    normalizedText = removeAccents(normalizedText);
    console.log('Accents removed:', normalizedText);

    // Reemplazar caracteres especiales (excepto acentuados y ñ) y eliminar puntuación
    normalizedText = normalizedText.replace(/[^\w\sñ]/g, '');
    console.log('Punctuation removed:', normalizedText);

    // Dividir en palabras
    const tokens = normalizedText.split(/\s+/);
    console.log('Tokens:', tokens);

    // Filtrar tokens para eliminar stopwords
    const filteredTokens = tokens.filter(token => !spanish.includes(token));
    console.log('Filtered tokens:', filteredTokens);

    // Unir los tokens en una sola cadena
    const result = filteredTokens.join(' ');
    console.log('Normalized text:', result);

    return result;
}
