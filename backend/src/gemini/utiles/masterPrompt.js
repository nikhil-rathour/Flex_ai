
// export const buildMasterPrompt = ({
//   websiteType,
//   sections,
//   context
// }) => {
//   return {
//     system_rules: {
//       role: "You are a secure, production-grade React SPA code generator.",
//       goal:
//         "Generate ONE large, multi-section, responsive Single Page Application using a single isolated React component.",
//       output_format: "JSON_ONLY",
//       strict_output: true,
//       no_markdown: true,
//       no_explanations: true,
//       no_comments_outside_code: true
//     },

//     generation_rules: {
//       framework: "react",
//       component_type: "functional",
//       component_name: "GeneratedSPA",
//       export_rule: "return_component_reference",
//       jsx_allowed: false,
//       element_creation: "React.createElement_only",
//       styling: "tailwindcss_className_only",
//       responsiveness: "mandatory",
//       responsive_breakpoints: ["sm", "md", "lg", "xl"],
//       hooks_allowed: [],
//       hooks_disallowed: [
//         "useEffect",
//         "useRef",
//         "useContext",
//         "useReducer",
//         "useMemo",
//         "useCallback"
//       ],
//       data_policy: "hardcoded-only",
//       props_allowed: false,
//       state_allowed: false,
//       imports_allowed: false,
//       external_dependencies: false,
//       inline_styles_allowed: false
//     },

//     section_rules: {
//       behavior:
//         "Render ALL requested sections inside the SAME component using nested React.createElement calls.",
//       section_order: "Maintain EXACT order provided by the user.",
//       section_wrapper:
//         "Each section MUST be wrapped in a <section> element with a data-section attribute matching the section name.",
//       layout_expectation:
//         "Use container, grid, and spacing utilities to support large layouts and clear section separation."
//     },

//     security_rules: {
//       disallowed: [
//         "eval",
//         "new Function",
//         "dangerouslySetInnerHTML",
//         "<script>",
//         "window",
//         "document",
//         "localStorage",
//         "sessionStorage",
//         "fetch",
//         "axios",
//         "XMLHttpRequest",
//         "WebSocket",
//         "process.env",
//         "require",
//         "import(",
//         "setTimeout",
//         "setInterval"
//       ],
//       network_access: false,
//       filesystem_access: false,
//       no_event_handlers: true,
//       no_dynamic_execution: true,
//       no_authentication_logic: true,
//       no_api_calls: true,
//       no_routing: true
//     },

//     output_contract: {
//       format: "json",
//       schema: {
//         output: {
//           component_name: "GeneratedSPA",
//           code: "EXECUTABLE_REACT_CODE_STRING"
//         }
//       },
//       rules: [
//         "Return ONLY the JSON object",
//         "Return ONLY one component",
//         "Do NOT include arrays, helpers, or extra functions",
//         "Do NOT include imports or exports",
//         "Code MUST end with `return GeneratedSPA;`",
//         "All markup MUST be created using React.createElement",
//         "If any rule is violated, return { \"output\": null }"
//       ]
//     },

//     user_input: {
//       website_type: websiteType,
//       sections,
//       context:
//         typeof context === "string"
//           ? context
//           : "No additional context provided."
//     },

//     final_instructions: {
//       generate_single_component_only: true,
//       embed_all_sections_inside_one_component: true,
//       enforce_large_layout_structure: true,
//       use_react_createElement_only: true,
//       use_tailwind_className_only: true,
//       ensure_responsive_design: true,
//       if_disallowed_pattern_detected:
//         "RETURN { \"output\": null }"
//     }
//   };
// };


// export const buildMasterPrompt = ({
//   websiteType,
//   sections,
//   context
// }) => {
//   return `Generate a React component using ONLY React.createElement. Return ONLY valid JSON in this exact format:
// {
//   "output": {
//     "component_name": "GeneratedSPA",
//     "code": "function GeneratedSPA() { return React.createElement(...); } return GeneratedSPA;"
//   }
// }

// RULES:
// - Use React.createElement ONLY (no JSX)
// - Use Tailwind CSS classes for styling
// - NO imports, exports, hooks, or state
// - NO inline styles, animations, or <style> tags
// - Create sections: ${sections}
// - Website type: ${websiteType}
// - Context: ${context}
// - Make it responsive and modern
// - Keep code concise and complete
// - End with: return GeneratedSPA;





// HEADER & NAVIGATION (AUTO SCROLL):
// - MUST include a header/navigation section
// - Header links MUST use anchor tags ONLY
// - Use <a href="#section-id"> for navigation
// - NO JavaScript scrolling logic
// - NO onClick handlers


// SECTION RULES:
// - EACH section MUST be wrapped in a <section> element
// - EACH section MUST include an id attribute
// - IDs must be lowercase and kebab-case
//   (example: hero, about, projects, skills, contact)
// - Header links MUST match section ids exactly

// LAYOUT & STYLE RULES:
// - Use large spacing (py-16 to py-24)
// - Use max-w-7xl mx-auto containers
// - Cards: rounded-xl or rounded-2xl
// - Use shadow-lg or shadow-xl for depth
// - Alternate section backgrounds for visual rhythm
// - Strong visual hierarchy with typography
// - Headings: text-4xl to text-6xl, font-bold
// - Body text: text-lg, leading-relaxed




// `;



// };





export const buildMasterPrompt = ({
  websiteType,
  sections,
  context,
  palette,
  layout
}) => {
  const colorHex = palette ? `Background: ${palette.colors.background}, Primary: ${palette.colors.primary}, Text: ${palette.colors.textPrimary}` : '';

  return `Generate a SINGLE-FILE React SPA component using ONLY React.createElement.

Return ONLY valid JSON in EXACTLY this format:
{
  "output": {
    "component_name": "GeneratedSPA",
    "code": "function GeneratedSPA() { return React.createElement(...); } return GeneratedSPA;"
  }
}

STRICT RULES:
- Use React.createElement ONLY (NO JSX)
- NO imports, exports, hooks, state, refs, or effects
- NO JavaScript scrolling logic
- NO onClick handlers
- NO inline styles
- NO animations or <style> tags
- NO COMMENTS in code (no // or /* */)
- Use Tailwind CSS utility classes ONLY
- Component MUST be self-contained
- End code with: return GeneratedSPA;

WEBSITE STRUCTURE:
- Website type: ${websiteType}
- Layout style: ${layout || 'classic-vertical-spa'}
- Sections to generate: ${sections}
- Context: ${context}
${colorHex ? `- Colors to use: ${colorHex}` : ''}

HEADER & NAVIGATION (MANDATORY):
- MUST include a fixed header at the top
- Header MUST contain navigation links for ALL sections
- Navigation MUST use anchor tags ONLY
  Example:
  <a href="#projects">Projects</a>
- DO NOT use JavaScript for navigation
- DO NOT use buttons for navigation
- Header must remain visible while scrolling
- Add sufficient top padding to sections so content is not hidden by fixed header

SECTION REQUIREMENTS:
- EACH section MUST be wrapped in a <section> element
- EACH section MUST include a unique id attribute
- IDs MUST be lowercase and kebab-case
  Examples:
  hero
  about
  projects
  skills
  contact
- Header anchor href values MUST match section ids EXACTLY

SCROLL BEHAVIOR:
- Rely on native browser anchor scrolling
- Smooth scrolling must be achieved using Tailwind-compatible utility approach
  (assume global smooth-scroll support)
- NO JavaScript scroll APIs allowed

LAYOUT & DESIGN RULES:
- Use large vertical spacing (py-16 to py-24)
- Use max-w-7xl mx-auto containers
- Cards must use rounded-xl or rounded-2xl
- Use shadow-lg or shadow-xl for depth
- Alternate section background colors for visual rhythm
- Dark, modern, premium UI
- Strong visual hierarchy:
  - Headings: text-4xl to text-6xl, font-bold
  - Body text: text-lg, leading-relaxed

RESPONSIVENESS:
- Navigation must wrap or stack on smaller screens
- Sections must remain readable on all screen sizes

OUTPUT RULES:
- Return ONLY the JSON
- NO explanations
- NO markdown
- NO comments in the code string
`;
};
