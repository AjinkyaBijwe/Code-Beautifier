import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/global';
import { MatDialog } from '@angular/material';
import { ConfirmResetComponent } from './confirm-reset/confirm-reset.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    global: Global;
    dialog: MatDialog;
    codeOptions: any;
    code: string;
    options: any;
    languageDefaults: any;
    defaultOptions: any;
    sqlOptions: any;
    data: any;
    darkMode: boolean;
    selectedLanguageType: string;

    constructor(global: Global, dialog: MatDialog) {
        this.global = global;
        this.dialog = dialog;
    }

    ngOnInit() {
        this.codeOptions = {
            lineNumbers: true,
            theme: 'default',
            mode: 'javascript'
        };
        const settings = JSON.parse(localStorage.getItem('beautifierSettings'));
        if (settings) {
            this.setOptionsFromStorage(settings);
        } else {
            this.setOptions();
        }
        this.defaultOptions = this.global.underscore.clone(this.options);
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
        this.setLocalStorage(null, null);
    }

    setOptions = () => {
        this.darkMode = false;
        this.selectedLanguageType = 'js';
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
        this.changeLanguageType();
    }

    setOptionsFromStorage = (settings) => {
        this.darkMode = settings['darkMode'];
        this.options = settings['options'];
        this.sqlOptions = settings['sqlOptions'];
        this.selectedLanguageType = settings['selectedLanguage'];
        this.codeOptions['mode'] = settings['codeEditorMode'];
        this.code = settings['code'];
    }

    changeLanguageType = () => {
        this.data = this.global.data;
        switch (this.selectedLanguageType) {
            case 'html':
                this.options['end_with_newline'] = true;
                this.code = this.data['html'];
                this.codeOptions['mode'] = 'htmlmixed';
            break;
            case 'css':
                this.options['indent_size'] = 1;
                this.code = this.data['css'];
                this.codeOptions['mode'] = 'css';
            break;
            case 'js':
                this.options['preserve_newlines'] = true;
                this.code = this.data['js'];
                this.codeOptions['mode'] = 'javascript';
            break;
            case 'sql':
                this.code = this.data['sql'];
                this.codeOptions['mode'] = 'sql';
            break;
            case 'json':
                this.code = this.data['json'];
                this.codeOptions['mode'] = 'application/json';
            break;
            default:
            break;
        }
        this.setLocalStorage(null, null);
    }

    resetDefault = () => {
        this.options = this.global.underscore.assign({}, this.defaultOptions);
        this.setLocalStorage('options', this.options);
    }

    validateJSON = (event) => {
        this.options = JSON.parse(event);
    }

    setLocalStorage = (key, value) =>{
        let settings;
        if (key) {
            settings = JSON.parse(localStorage.getItem('beautifierSettings'));
            settings[key] = value;
        } else {
            settings = {
                'darkMode': this.darkMode,
                'options': this.options,
                'sqlOptions': this.sqlOptions,
                'selectedLanguage': this.selectedLanguageType,
                'codeEditorMode': this.codeOptions['mode'],
                'code': this.code
            };
        }
        localStorage.setItem('beautifierSettings', JSON.stringify(settings))
    }

    clearStorageOptions = () =>{
        const className = this.darkMode ? 'confirmation-dark' : 'confirmation';
        const dialogRef = this.dialog.open(ConfirmResetComponent, {
            panelClass: className,
            restoreFocus: false
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                localStorage.removeItem('beautifierSettings');
                this.setOptions();
            }
        });
    }
}

