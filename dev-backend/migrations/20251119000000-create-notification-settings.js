'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('notification_settings', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      entity_type: {
        type: Sequelize.ENUM('restaurant', 'manager', 'admin'),
        allowNull: false,
        comment: '설정을 소유한 엔티티 타입'
      },
      entity_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '레스토랑 ID, 매니저 ID, 또는 관리자 ID'
      },

      // 이메일 설정
      email_enabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      smtp_host: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      smtp_port: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 587
      },
      smtp_secure: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      smtp_user: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      smtp_password: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      from_email: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      from_name: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      reply_to_email: {
        type: Sequelize.STRING(255),
        allowNull: true
      },

      // SMS/왓츠앱 (나중에 구현)
      sms_enabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      whatsapp_enabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('notification_settings', ['entity_type', 'entity_id'], {
      unique: true,
      name: 'unique_entity_settings'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('notification_settings');
  }
};
