module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // Tính năng mới
        'fix', // Sửa lỗi
        'docs', // Tài liệu
        'style', // Format, thiếu dấu chấm phẩy, v.v.; không có thay đổi code
        'refactor', // Refactor code
        'perf', // Cải thiện hiệu suất
        'test', // Thêm test
        'chore', // Các thay đổi build process hoặc auxiliary tools
        'ci', // CI related changes
        'build', // Build system changes
        'revert', // Revert to a commit
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'scope-empty': [0, 'never'],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
  },
};
