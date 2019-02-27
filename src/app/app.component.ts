import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/global';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    title: string;
    isCollapsed: boolean;
    selectedIntendation: string;
    selectedLanguageType: string;
    selectedTabSpace: string;
    selectedNewLine: string;
    selectedWarp: string;
    selectedBraces: string;
    codeOptions: {
        lineNumbers: boolean;
        theme: string;
        mode: string;
    };
    code: string;
    options: any;
    global: Global;
    languageDefaults: any;
    defaultOptions: any;
    sqlOptions: any;
    data: any;
    darkMode: boolean;

    constructor(global: Global) {
        this.global = global;
    }

    ngOnInit() {
        this.darkMode  = false;
        this.selectedLanguageType = 'js';
        this.codeOptions = {
            lineNumbers: true,
            theme: 'default',
            mode: 'javascript'
        };
        this.options = {
            'indent_size': 4,
            'indent_char': ' ',
            'eol': '\n',
            'indent_level': 0,
            'max_preserve_newlines': 10,
            'wrap_line_length': 0,
            'operator_position': 'before-newline',
            'brace_style': 'collapse',
            'indent_scripts': 'normal',
            // all boolean options
            'indent_with_tabs': true,
            'preserve_newlines': true,
            'end_with_newline': false,
            'editorconfig': false,
            'space_in_paren': false,
            'space_in_empty_paren': false,
            'jslint_happy': false,
            'space_after_anon_function': false,
            'space_after_named_function': false,
            'unindent_chained_methods': false,
            'break_chained_methods': false,
            'keep_array_indentation': true,
            'unescape_strings': false,
            'e4x': false,
            'comma_first': false,
            'eval_code': false,
            'space_before_conditional': true,
            'indent-inner-html': false
        };
        this.sqlOptions = {
            language: 'sql',
            indentation: 4,
            upperCase: false,
        };
        this.defaultOptions = this.global.underscore.clone(this.options);
        this.changeLanguageType();
    }

    beautify = () => {
        if (this.selectedLanguageType === 'sql') {
            if (this.sqlOptions['upperCase']) {
                this.code = this.code.toUpperCase();
            }
            const indent = '\xa0';
            this.sqlOptions['indent'] = indent.repeat(this.sqlOptions['indentation']);
            this.code = this.global.sqlFormatter(this.code, this.sqlOptions);
        } else if (this.selectedLanguageType === 'json') {
            this.code = this.global.beautify['js'](this.code, this.options);
        } else {
            this.code = this.global.beautify[this.selectedLanguageType](this.code, this.options);
        }
    }

    changeLanguageType = () => {
        this.resetDefault();
        this.data = this.global.data;
        switch (this.selectedLanguageType) {
            case 'html':
                this.options['end_with_newline'] = true;
                this.code = this.data['html'];
            break;
            case 'css':
                this.options['indent_size'] = 1;
                this.code = this.data['css'];
            break;
            case 'js':
                this.options['preserve-newlines'] = true;
                this.code = this.data['js'];
            break;
            case 'sql':
                this.code = this.data['sql'];
            break;
            case 'json':
                this.code = this.data['json'];
            break;
            default:
            break;
        }
    }

    resetDefault = () => {
        this.options = this.global.underscore.assign({}, this.defaultOptions);
    }

    validateJSON = (event) => {
        this.options = JSON.parse(event);
    }
}

