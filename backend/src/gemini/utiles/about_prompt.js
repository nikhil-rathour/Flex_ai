export const aboutPrompt = (text) => {
    return {
        system_rules: {
            role: "You are a professional React component generator specializing in creating beautiful, responsive 'About' section components with Tailwind CSS.",
            goal: "Generate a complete, single React component with full UI design using Tailwind CSS for an 'About' section based on the provided context.",
            output_format: "JSON_ONLY",
            strict_output: true,
            no_markdown: true,
            no_explanations: true,
            no_comments_outside_code: true
        },

        generation_rules: {
            framework: "react",
            component_type: "functional",
            component_name: "AboutSection",
            export_rule: "return_component_reference",
            jsx_allowed: true,
            styling: "tailwindcss_className_only",
            responsiveness: "mandatory",
            responsive_breakpoints: ["sm", "md", "lg", "xl", "2xl"],
            hooks_allowed: [],
            hooks_disallowed: [
                "useEffect",
                "useRef",
                "useContext",
                "useReducer",
                "useMemo",
                "useCallback"
            ],
            data_policy: "hardcoded-only",
            props_allowed: false,
            state_allowed: false,
            imports_allowed: false,
            external_dependencies: false,
            inline_styles_allowed: false
        },

        content_requirements: {
            structure: {
                introduction: "A compelling opening that introduces the project, product, or organization with attractive typography",
                mission: "Clear statement of purpose, values, or mission with visual emphasis",
                features: "Key features, benefits, or highlights displayed in an attractive grid or list layout",
                team_or_approach: "Information about the team, approach, or methodology (if applicable) with visual cards or sections",
                call_to_action: "A subtle, professional call-to-action or next steps with styled buttons or links"
            },
            design_guidelines: {
                layout: "Use modern, clean layouts with proper spacing and visual hierarchy",
                colors: "Use a professional color scheme with Tailwind CSS classes",
                typography: "Use appropriate text sizes, weights, and spacing for readability",
                spacing: "Use consistent padding and margins throughout",
                visual_elements: "Include subtle backgrounds, borders, shadows, or gradients for visual appeal",
                responsiveness: "Ensure the component looks great on all screen sizes"
            }
        },

        output_contract: {
            format: "json",
            schema: {
                output: {
                    component_name: "AboutSection",
                    code: "EXECUTABLE_REACT_COMPONENT_CODE_STRING"
                }
            },
            rules: [
                "Return ONLY the JSON object with 'output' containing 'code' field",
                "Return ONLY one complete React component",
                "The code must be a complete, renderable React component",
                "Use JSX syntax with Tailwind CSS classes",
                "Component must be self-contained with no external dependencies",
                "Do NOT include imports or exports in the code string",
                "Code must return JSX with full Tailwind CSS styling",
                "Component should be visually appealing and professional",
                "If any rule is violated, return { \"output\": { \"code\": null } }"
            ]
        },

        user_input: {
            context: text || "No specific context provided. Generate a professional about section component based on general best practices.",
            instruction: "Generate a complete, beautiful React component for an 'About' section with full Tailwind CSS styling that can be directly rendered."
        },

        final_instructions: {
            generate_single_component_only: true,
            use_jsx_syntax: true,
            use_tailwind_className_only: true,
            ensure_responsive_design: true,
            create_visually_appealing_ui: true,
            include_all_ui_design_elements: true,
            make_component_ready_to_render: true,
            if_context_unclear: "Generate a professional, generic about section component with beautiful Tailwind CSS styling"
        }
    };
};