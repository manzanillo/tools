// Tab switching functionality
function switchTab(tabName) {
    // Hide all tabs
    document.getElementById('unicode-tab').classList.remove('active');
    document.getElementById('formatted-tab').classList.remove('active');
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab and activate button
    if (tabName === 'unicode') {
        document.getElementById('unicode-tab').classList.add('active');
        document.querySelectorAll('.tab-button')[0].classList.add('active');
    } else if (tabName === 'formatted') {
        document.getElementById('formatted-tab').classList.add('active');
        document.querySelectorAll('.tab-button')[1].classList.add('active');
    }
}

// Make switchTab available globally
window.switchTab = switchTab;

// Process formatted text from Word/Outlook
function processFormattedText(element) {
    let processedText = '';
    
    // Process each child node
    for (let node of element.childNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
            // Regular text node
            processedText += node.textContent;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            const tagName = node.tagName.toLowerCase();
            const text = node.textContent;
            
            // Convert formatting based on HTML tags
            if (tagName === 'b' || tagName === 'strong') {
                // Convert to LinkedIn bold
                processedText += convertText(text, boldMap);
            } else if (tagName === 'i' || tagName === 'em') {
                // Convert to LinkedIn italic
                processedText += convertText(text, italicMap);
            } else if (tagName === 'br') {
                // Preserve line breaks
                processedText += '\n';
            } else if (tagName === 'p' || tagName === 'div') {
                // Process paragraph content and add line breaks
                processedText += processFormattedText(node) + '\n';
                continue; // Skip the regular processing below
            } else {
                // For other tags, process their content recursively
                processedText += processFormattedText(node);
                continue;
            }
        }
    }
    
    return processedText;
}

// Update formatted text output
function updateFormattedText() {
    const inputElement = document.getElementById('formattedInput');
    const outputElement = document.getElementById('formattedOutput');
    
    // Get the HTML content to preserve formatting
    const htmlContent = inputElement.innerHTML;
    
    // Create a temporary element to process the content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    // Process the formatted content
    let processedText = processFormattedText(tempDiv);
    
    // Clean up extra line breaks
    processedText = processedText
        .replace(/\n\s*\n\s*\n/g, '\n\n') // Replace multiple line breaks with double
        .replace(/^\s+|\s+$/g, ''); // Trim whitespace
    
    // Update output
    outputElement.textContent = processedText;
}

// Mapping regular characters to bold, bold italics, and italics Unicode equivalents
const boldMap = {
    'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛', 'I': '𝗜', 'J': '𝗝', 'K': '𝗞',
    'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧', 'U': '𝗨', 'V': '𝗩',
    'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭',
    'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵', 'i': '𝗶', 'j': '𝗷', 'k': '𝗸',
    'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽', 'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁', 'u': '𝘂', 'v': '𝘃',
    'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇',
    '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰', '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵'
};

const boldItalicMap = {
    'A': '𝘼', 'B': '𝘽', 'C': '𝘾', 'D': '𝘿', 'E': '𝙀', 'F': '𝙁', 'G': '𝙂', 'H': '𝙃', 'I': '𝙄', 'J': '𝙅', 'K': '𝙆',
    'L': '𝙇', 'M': '𝙈', 'N': '𝙉', 'O': '𝙊', 'P': '𝙋', 'Q': '𝙌', 'R': '𝙍', 'S': '𝙎', 'T': '𝙏', 'U': '𝙐', 'V': '𝙑',
    'W': '𝙒', 'X': '𝙓', 'Y': '𝙔', 'Z': '𝙕',
    'a': '𝙖', 'b': '𝙗', 'c': '𝙘', 'd': '𝙙', 'e': '𝙚', 'f': '𝙛', 'g': '𝙜', 'h': '𝙝', 'i': '𝙞', 'j': '𝙟', 'k': '𝙠',
    'l': '𝙡', 'm': '𝙢', 'n': '𝙣', 'o': '𝙤', 'p': '𝙥', 'q': '𝙦', 'r': '𝙧', 's': '𝙨', 't': '𝙩', 'u': '𝙪', 'v': '𝙫',
    'w': '𝙬', 'x': '𝙭', 'y': '𝙮', 'z': '𝙯',
    '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰', '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵'
};

const italicMap = {
    'A': '𝐴', 'B': '𝐵', 'C': '𝐶', 'D': '𝐷', 'E': '𝐸', 'F': '𝐹', 'G': '𝐺', 'H': '𝐻', 'I': '𝐼', 'J': '𝐽', 'K': '𝐾',
    'L': '𝐿', 'M': '𝑀', 'N': '𝑁', 'O': '𝑂', 'P': '𝑃', 'Q': '𝑄', 'R': '𝑅', 'S': '𝑆', 'T': '𝑇', 'U': '𝑈', 'V': '𝑉',
    'W': '𝑊', 'X': '𝑋', 'Y': '𝑌', 'Z': '𝑍',
    'a': '𝑎', 'b': '𝑏', 'c': '𝑐', 'd': '𝑑', 'e': '𝑒', 'f': '𝑓', 'g': '𝑔', 'h': '𝒉', 'i': '𝑖', 'j': '𝒋', 'k': '𝑘',
    'l': '𝑙', 'm': '𝑚', 'n': '𝑛', 'o': '𝑜', 'p': '𝑝', 'q': '𝑞', 'r': '𝑟', 's': '𝑠', 't': '𝑡', 'u': '𝑢', 'v': '𝑣',
    'w': '𝑤', 'x': '𝑥', 'y': '𝑦', 'z': '𝑧',
    '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9'
};

// Convert input text to specified format
function convertText(text, map) {
    return text.split('').map(char => map[char] || char).join('');
}

// Auto-update text formatting as user types
function updateUnicodeText() {
    const inputText = document.getElementById('inputText').value;

    const boldText = convertText(inputText, boldMap);
    const boldItalicText = convertText(inputText, boldItalicMap);
    const italicText = convertText(inputText, italicMap);

    document.getElementById('outputBold').textContent = boldText;
    document.getElementById('outputBoldItalic').textContent = boldItalicText;
    document.getElementById('outputItalic').textContent = italicText;
}

// Add event listener for real-time updates
document.getElementById('inputText').addEventListener('input', updateUnicodeText);

// Add event listener for formatted text input
document.addEventListener('DOMContentLoaded', function() {
    const formattedInput = document.getElementById('formattedInput');
    if (formattedInput) {
        formattedInput.addEventListener('input', updateFormattedText);
        formattedInput.addEventListener('paste', function(e) {
            // Allow the paste to happen, then process after a short delay
            setTimeout(updateFormattedText, 10);
        });
    }
});

// Handle clipboard copy
function copyToClipboard(outputId) {
    const text = document.getElementById(outputId).textContent;
    if (text) {
        navigator.clipboard.writeText(text).then(() => {
            //alert(`${outputId} text copied to clipboard!`);
        }).catch(err => {
            alert('Failed to copy text: ', err);
        });
    } else {
        alert('No text to copy!');
    }
}

document.getElementById('copyBoldBtn').addEventListener('click', function () {
    copyToClipboard('outputBold');
});

document.getElementById('copyBoldItalicBtn').addEventListener('click', function () {
    copyToClipboard('outputBoldItalic');
});

document.getElementById('copyItalicBtn').addEventListener('click', function () {
    copyToClipboard('outputItalic');
});

// Add copy button for formatted text
document.addEventListener('DOMContentLoaded', function() {
    const copyFormattedBtn = document.getElementById('copyFormattedBtn');
    if (copyFormattedBtn) {
        copyFormattedBtn.addEventListener('click', function () {
            copyToClipboard('formattedOutput');
        });
    }
});
