/* eslint-disable no-alert */
/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog() {
    let value = '';
    const setValue = (event) => {
        value = event.target.value;
    };

    const submit = () => {
        alert('提交成功');
    };

    const numberChecker = () => {
        const re = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
        if (re.test(value)) {
            submit();
        } else {
            alert('请输入正确的邮箱');
        }
    };

    return (
        <div>
            <Dialog open aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">反馈内容</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        请输入您的反馈内容和您的邮箱地址,届时我们将会与您联系
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        onChange={(event) => { setValue(event); }}
                    />
                    <TextField
                        id="content"
                        label="Multiline"
                        multiline
                        rows="6"
                        defaultValue="......."
                        autoFocus
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={numberChecker}>
                        提交
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
