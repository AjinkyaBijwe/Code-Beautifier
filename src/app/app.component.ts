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
            indent: '    '
        };
        this.defaultOptions = this.global.underscore.clone(this.options);
        this.changeLanguageType();
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
            this.code = `body{font-family:Roboto!important;margin:0}
            .table{width:100%;margin-bottom:1rem;color:#212529}
            .table td,.table th{padding:.75rem;vertical-align:top;
            border-top:1px solid #dee2e6}.title{height:60px}`;
        } else if (this.selectedLanguageType === 'html') {
            this.options['end_with_newline'] = true;
            this.code = `<!doctype html><html lang="en"><head> <meta charset="utf-8">
                <title>Angular Beautifier</title> <base href="/"> <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="icon" type="image/x-icon" href="favicon.ico"></head><body> <app-root></app-root></body></html>`;
        } else if (this.selectedLanguageType === 'js') {
            this.options['preserve-newlines'] = true;
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
        } else if (this.selectedLanguageType === 'sql') {
            this.code = `INSERT INTO employees (employee_id,  first_name,
                last_name,    date_of_birth,
                phone_number, junk)
                SELECT GENERATE_SERIES
                , initcap(lower(random_string(2, 8)))
                , initcap(lower(random_string(2, 8)))
                , CURRENT_DATE - CAST(floor(random() * 365 * 10 + 40 * 365) AS NUMERIC) * INTERVAL '1 DAY'
                , CAST(floor(random() * 9000 + 1000) AS NUMERIC)
                , 'junk'
                FROM GENERATE_SERIES(1, 1000);`;
        }
    }

    resetDefault = () => {
        this.options = this.global.underscore.assign({}, this.defaultOptions);
    }
}
