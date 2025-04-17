package tr.com.muskar.taskVibe.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String assignee;
    @Enumerated(EnumType.STRING)
    private TaskStatusEnum status;
}
