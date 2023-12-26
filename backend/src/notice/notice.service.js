const {
  NoticeCreateResponseDTO,
  NoticeFindAllResponseDTO,
  NoticeFindResponseDTO,
} = require("./dto/notice.dto");
class NoticeService {
  constructor(Notice) {
    this.notice = Notice;
  }

  async createNotice(noticeCreateRequestDTO) {
    try {
      const notice = await this.notice.create({
        Notice_title: noticeCreateRequestDTO.noticeTitle,
        Notice_content: noticeCreateRequestDTO.noticeContent,
        Admin_id: noticeCreateRequestDTO.adminId,
        Notice_writer: noticeCreateRequestDTO.noticeWriter,
        Notice_image: noticeCreateRequestDTO.image,
      });

      return new NoticeCreateResponseDTO(notice);
    } catch (e) {
      console.error("Service createNotice Error", e);
      throw e;
    }
  }

  async findAllNotice() {
    try {
      const notices = await this.notice.findAll();
      return notices.map(
        (notice) => new NoticeFindAllResponseDTO(notice.dataValues)
      );
    } catch (e) {
      console.error("Service findAllNotice Error", e);
      throw new Error(e.message);
    }
  }

  async findNotice(noticeFindRequestDTO) {
    try {
      const notice = await this.notice.findOne({
        where: { Notice_id: noticeFindRequestDTO.noticeId },
      });
      if (!notice) {
        throw new Error("Notice not found");
      }
      return new NoticeFindResponseDTO(notice.dataValues);
    } catch (e) {
      console.error("Service findNotice Error", e);
      throw new Error(e.message);
    }
  }

  async updateNotice(noticeUpdateRequestDTO) {
    try {
      const { noticeId, noticeTitle, noticeContent } = noticeUpdateRequestDTO;
      await this.notice.update(
        {
          Notice_title: noticeTitle,
          Notice_content: noticeContent,
          Notice_image: image,
        },
        {
          where: { Notice_id: noticeId },
        }
      );
      return { message: "Update successful", noticeId: noticeId };
    } catch (e) {
      console.error("Service updateNotice Error", e);
      throw new Error(e.message);
    }
  }

  async deleteNotice(noticeDeleteRequestDTO) {
    try {
      const deletedRowCount = await this.notice.destroy({
        where: { Notice_id: noticeDeleteRequestDTO.noticeId },
      });
      if (deletedRowCount === 0) {
        throw new Error("Notice not found");
      }
      return { message: "Notice deletion successful" };
    } catch (e) {
      console.error("Service deleteNotice Error", e);
      throw new Error(e.message);
    }
  }
}

module.exports = NoticeService;
