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
    codeOptions: { lineNumbers: boolean; theme: string; mode: string; };
    code: string;
    options: any;
    global: Global;
    languageDefaults: any;
    defaultOptions: any;
    sqlOptions: any;

    constructor(global: Global) {
        this.global = global;
    }

    ngOnInit() {
        this.selectedLanguageType = 'js';
        this.codeOptions = {
            lineNumbers: true,
            theme: 'default',
            mode: 'javascript'
        };
        this.code = `function findSequence(goal) {
            function find(start, history) {
              if (start == goal)
                return history;
              else if (start > goal)
                return null;
              else
                return find(start + 5, "(" + history + " + 5)") ||
                       find(start * 3, "(" + history + " * 3)");
            }
            return find(1, "1");
          }`;

        this.options = {
            'indent_size': 4,
            'indent_char': ' ', //
            'eol': '\n', //
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
            indent: '    '
        };
        this.defaultOptions = this.global.underscore.clone(this.options);
        this.languageDefaults = {
            'indent_size': 4,
            'html': {
                'end_with_newline': true,
                'js': {
                    'indent_size': 2
                },
                'css': {
                    'indent_size': 2
                }
            },
            'css': {
                'indent_size': 1
            },
            'js': {
               'preserve-newlines': true
            }
        };
    }

    beautify = () => {
        if (this.selectedLanguageType === 'sql') {
            this.code = this.global.sqlFormatter(this.code, this.sqlOptions);
        } else {
            this.code = this.global.beautify[this.selectedLanguageType](this.code, this.options);
        }
    }

    changeLanguageType = () => {
        this.resetDefault();
        if (this.selectedLanguageType === 'css') {
            this.options['indent_size'] = 1;
        } else if (this.selectedLanguageType === 'html') {
            this.options['end_with_newline'] = true;
        } else if (this.selectedLanguageType === 'js') {
            this.options['preserve-newlines'] = true;
        }
    }

    resetDefault = () => {
        this.options = this.global.underscore.assign({}, this.defaultOptions);
    }
}
