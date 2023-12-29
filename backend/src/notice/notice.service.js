const {
  NoticeCreateResponseDTO,
  NoticeFindAllResponseDTO,
  NoticeFindResponseDTO,
} = require("./dto/notice.dto");
class NoticeService {
  constructor(Notice, Images) {
    this.notice = Notice;
    this.images = Images;
  }

  async createNotice(noticeCreateRequestDTO) {
    const { noticeTitle, noticeContent, adminId, noticeWriter } =
      noticeCreateRequestDTO;
    try {
      const notice = await this.notice.create({
        Notice_title: noticeTitle,
        Notice_content: noticeContent,
        Admin_id: adminId,
        Notice_writer: noticeWriter,
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
        include: [
          {
            model: this.images,
            as: "Images",
            attributes: ["Images_uid", "Images_url"],
          },
        ],
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
      const { noticeId, noticeTitle, noticeContent, image } =
        noticeUpdateRequestDTO;
      const updateData = {
        Notice_title: noticeTitle,
        Notice_content: noticeContent,
      };

      if (image) {
        updateData.Notice_image = image;
      }

      await this.notice.update(updateData, {
        where: { Notice_id: noticeId },
      });

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
