import importlib
import os
import sys

import click
import pytest

from app.server import run_server, app


@click.command()
@click.argument('command')
@click.option('--config',
              default=None,
              help='default: configs, 所有的 config 都在 configs 目录下,'
              ' example: configs.local_settings')
def manage(command, config):
    """
    python manage.py [command]
    command: [runserver|sync_db|test]
    """
    # 加载配置模块
    if config is None:
        config = 'configs'
    click.echo('\nUsing config: %s\n' % config)
    config_object = importlib.import_module(config)
    app.config.from_object(config_object)

    # 查找本模块中的函数并执行
    all_params = globals()
    if command not in all_params:
        raise SystemExit('Wrong command')

    command_func = all_params[command]
    command_func()


def test():
    """
    执行 pytest 测试
    测试时, 允许 cqlengine 修改数据表结构
    """
    base_dir = os.path.dirname(os.path.abspath(__file__))
    # 添加 -x option, 遇到 error 和 failed 直接退出
    sys.exit(
        pytest.main([
            '--disable-pytest-warnings', '--cov=views',
            '--cov-report=term-missing', '--cov-report=annotate', '-x', '-s',
            '-v', base_dir
        ]))


def runserver():
    """
    运行服务器
    """
    run_server()


if __name__ == '__main__':
    manage()
